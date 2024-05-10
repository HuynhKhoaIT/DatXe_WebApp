import { NextRequest } from "next/server";
import prisma from "../prismadb";
import convertToSlug, { generateUUID } from "@/utils/until";
import { createSeoMeta } from "./seoMeta";

export async function getPosts(requestData: any) {
  try {
    let titleFilter = "";
    const searchText = requestData.s;
    if (searchText) {
      titleFilter = searchText;
    }
    let garageId = {};
    if (requestData?.garageId) {
      garageId = requestData.garageId;
    }
    let currentPage = 1;
    let take = 10;
    let limit = Number(requestData.limit);
    let page = requestData.page;

    if (page) {
      currentPage = Number(page);
    }
    if (limit) {
      take = Number(limit);
    } else {
      limit = 10;
    }
    const skip = take * (currentPage - 1);
    let createdById = {};
    if (requestData.createdById) {
      createdById = 1;
    }
    let method = {};
    if (requestData.method) {
      method = requestData.method;
    }
    const [data, total] = await prisma.$transaction([
      prisma.post.findMany({
        take: take,
        skip: skip,
        orderBy: {
          createdAt: "asc",
        },
        where: {
          title: {
            contains: titleFilter,
          },
          status: {
            not: "DELETE",
          },
          garageId: garageId,
        },
        include: {
          categories: true,
        },
      }),
      prisma.post.count({
        where: {
          status: {
            not: "DELETE",
          },
          title: {
            contains: titleFilter,
          },
          garageId: garageId,
        },
      }),
    ]);
    return {
      data: data,
      total: total,
      currentPage: currentPage,
      limit: limit,
      totalPage: Math.ceil(total / limit),
      status: 200,
    };
  } catch (error) {
    return { error };
  }
}

export async function createPost(dataInput: any) {
  try {
    const post = {
      uuId: generateUUID(),
      slug: convertToSlug(dataInput.slug),
      title: dataInput.title,
      description: dataInput.description,
      shortDescription: dataInput.shortDescription,
      thumbnail: dataInput.thumbnail,
      banner: dataInput.banner,
      status: dataInput.status,
      createdBy: dataInput.createdBy,
      garageId: dataInput.garageId,      
    }
    const rs = await prisma.post.create({ data: post });
    const seoData = {
        seoTitle: dataInput.seoTitle,
        seoDescription: dataInput.seoDescription,
        seoThumbnail: dataInput.seoThumbnail,
        postId: rs.id
    }
    const seo = await createSeoMeta(seoData);
    console.log(seo)
    return rs;
  } catch (error) {
    return { error };
  }
}
export async function updatePost(id: string,data: any) {
  try {
    const postData = await findPostAdmin(id);
    const seoData = {
      seoTitle: data.seoTitle ?? postData.seoMeta?.title,
      seoDescription: data.seoDescription ?? postData.seoMeta?.description,
      seoThumbnail: data.seoThumbnail ?? postData.seoMeta?.thumbnail,
      postId: id
    }
    
    const seo = await createSeoMeta(seoData);
    const rs = await prisma.post.update({
      where: {
        id: id,
      },
      data: {
        slug: convertToSlug(data.slug),
        title: data.title ?? postData.title,
        description: data.description ?? postData.description,
        shortDescription: data.shortDescription ?? postData.shortDescription,
        thumbnail: data.thumbnail ?? postData.thumbnail,
        banner: data.banner ?? postData.banner,
        status: data.status ?? postData.status,
        createdBy: data.createdBy ?? postData.createdBy,
        garageId: data.garageId ?? postData.garageId,
      },
    });
    
    return rs;
  } catch (error) {
    return { error };
  }
}

export async function findPostAdmin(id: string) {
  return await prisma.post.findFirstOrThrow({
    where: {
      id: id,
    },
    include: {
      seoMeta: true
    }
  });
}

export async function findPost(id: string) {
  return await prisma.post.findFirstOrThrow({
    where: {
      status: {
        not: "DELETE",
      },
      id: id,
      garage:{
        status: 'PUBLIC'
      },
    },
    include: {
      seoMeta: true
    }
  });
}


export async function deletePost(id: string) {
  return await prisma.post.update({
    where: {
      id
    },
    data:{
      status:'DELETE'
    }
  });
}
