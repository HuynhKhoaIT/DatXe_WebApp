import prisma from '@/app/libs/prismadb';
import { getServerSession } from 'next-auth/next';
import { NextRequest, NextResponse } from 'next/server';
import { authOptions } from '../../../auth/[...nextauth]/route';
import { getProductById } from '@/app/libs/prisma/product';
import { getGarageIdByDLBDID } from '@/app/libs/prisma/garage';
import { createSeoMeta } from '@/app/libs/prisma/seoMeta';

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const now = new Date();
        const id = params.id;

        if (!id) {
            return new NextResponse("Missing 'id' parameter");
        }
        const session = await getServerSession(authOptions);
        if (session) {
            const product = await getProductById(id);
            return NextResponse.json({ data: product });
        }
        throw new Error('Chua dang nhap');
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
    try {
        const session = await getServerSession(authOptions);
        if (session && session.user?.role == 'ADMINGARAGE') {
            const id = params.id;
            const garageId = (await getGarageIdByDLBDID(Number(session.user?.garageId))).toString();
            let createdBy = "0";
            let isProduct = true;
            let catArr: any = [];
            if (!id) {
                return new NextResponse("Missing 'id' parameter");
            }
            const json = await request.json();

            if (!json.categories) {
                return new NextResponse("Missing 'categoryId' parameter");
            } else {
                json.categories.forEach(function (id: number) {
                    catArr.push({
                        assignedBy: session?.user?.name ?? '',
                        assignedAt: new Date(),
                        category: {
                            connect: {
                                id: (id.toString()),
                            },
                        },
                    });
                });
            }

            let brands = {};
            let brandArr: any = [];
            if (json.brands) {
                let brandArrTemp: any = [];
                json.brands.forEach(function (b: any) {
                    const assignedAt = new Date();
                    const assignedBy = session?.user?.name ?? 'Admin';
                    if (b.yearId) {
                        const yearArr = b.yearId.split(',');
                        yearArr.forEach(function (y: any) {
                            let yO = {
                                assignedBy: assignedBy,
                                assignedAt: assignedAt,
                                carBrandType: 'CARYEAR',
                                carModel: {
                                    connect: {
                                        id: (y),
                                    },
                                },
                            };
                            if (!brandArrTemp.includes((y))) {
                                brandArrTemp.push((y));
                                brandArr.push(yO);
                            }
                        });
                    }
                    if (b.nameId) {
                        let bO = {
                            assignedBy: assignedBy,
                            assignedAt: assignedAt,
                            carBrandType: 'CARNAME',
                            carModel: {
                                connect: {
                                    id: (b.nameId),
                                },
                            },
                        };
                        if (!brandArrTemp.includes((b.nameId))) {
                            brandArrTemp.push(Number(b.nameId));
                            brandArr.push(bO);
                        }
                    }
                    if (b.brandId) {
                        let cO = {
                            assignedBy: assignedBy,
                            assignedAt: assignedAt,
                            carBrandType: 'CARYEAR',
                            carModel: {
                                connect: {
                                    id: Number(b.brandId),
                                },
                            },
                        };
                        if (!brandArrTemp.includes(Number(b.brandId))) {
                            brandArrTemp.push(Number(b.brandId));
                            brandArr.push(cO);
                        }
                    }
                });
                brands = {
                    deleteMany: {},
                    create: brandArr,
                };
            }
            if (session?.user?.id) {
                createdBy = session.user.id.toString();
            }
            if (json.isProduct.length) {
                isProduct = (json.isProduct) == 1 ? true : false;
            }

            let productUpdateData = {
                name: json.title,
                price: json.price,
                salePrice: json.salePrice,
                productId: json.productId ?? 0,
                description: json.description ?? '',
                timeSaleStart: json.timeSaleStart ?? null,
                timeSaleEnd: json.timeSaleEnd ?? null,
                quantity: json.quantity ?? 0,
                images: json.images ?? null,
                metaDescription: json.metaDescription ?? null,
                status: json.status,
                createdBy: createdBy,
                garageId: garageId ?? "2",
                brandDetail: JSON.stringify(json.brands),
                categories: {
                    deleteMany: {},
                    create: json.categories.map((cat: string) => ({
                        assignedBy: session?.user?.name ?? '',
                        assignedAt: new Date(),
                        category: {
                            connect: {
                                id: cat,
                            },
                        },
                    })),
                },
                brands,
                isProduct: isProduct,
            };
            const updatedPost = await prisma.product.update({
                where: {
                    id:(id),
                },
                data: productUpdateData,
                include: {
                    categories: true,
                },
            });

            const seoData = {
                seoTitle: json.seoTitle,
                seoDescription: json.seoDescription,
                seoThumbnail: json.seoThumbnail,
                productId: id
            }
            const seo = await createSeoMeta(seoData);

            return new NextResponse(JSON.stringify(updatedPost), {
                status: 201,
                headers: { 'Content-Type': 'application/json' },
            });
        }
    } catch (error: any) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
    const id = params.id;
    if (!id) {
        return new NextResponse("Missing 'id' parameter");
    }

    const product = await prisma.product.update({
        where: {
            id: (id.toString()),
        },
        data: {
            status: 'DELETE',
        },
    });

    return NextResponse.json({ success: 1, message: 'Delete success' });
}
