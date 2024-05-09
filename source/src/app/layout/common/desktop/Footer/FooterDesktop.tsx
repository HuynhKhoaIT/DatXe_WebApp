"use client";
import Link from "next/link";
import styles from "./index.module.scss";
import { Button, Input } from "@mantine/core";
import ChPlay from "@/assets/images/chPlay.svg";
import AppStore from "@/assets/images/appStore.svg";
import Twiter from "@/assets/icons/twiter.svg";
import FaceBook from "@/assets/icons/faceBookYellow.svg";
import Instagram from "@/assets/icons/instagramYellow.svg";
import Send from "@/assets/icons/send.svg";
import Container from "@/app/components/common/Container";
import Typo from "@/app/components/elements/Typo";
const MyFooter = () => (
  <footer className={styles.footerArea}>
    <div className={styles.footerWidget}>
      <Container>
        <div className={styles.row}>
          <div className={styles.left}>
            <Typo size="small" type="bold" className={styles.introduceTitle}>
              Về chúng tôi
            </Typo>
            <Typo size="primary" className={styles.introduceContent}>
              Datxe.com trang web đặt dịch vụ ô tô trực tuyến.
            </Typo>
            <div className={styles.iconSocial}>
              <ul className={styles.listSocial}>
                <li className={styles.itemSocial}>
                  <img src={Twiter.src} />
                </li>
                <li className={styles.itemSocial}>
                  <img src={FaceBook.src} />
                </li>
                <li className={styles.itemSocial}>
                  <img src={Instagram.src} />
                </li>
              </ul>
            </div>
          </div>
          <div className={styles.right}>
            <div>
              <ul className={styles.listItem}>
                <li className={styles.item}>
                  <Link href={"#"}>
                    <Typo
                      size="primary"
                      style={{ color: "var(--text-color-light)" }}
                    >
                      Giới thiệu
                    </Typo>
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href={"#"}>
                    <Typo
                      size="primary"
                      style={{ color: "var(--text-color-light)" }}
                    >
                      Điều khoản
                    </Typo>
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href={"#"}>
                    <Typo
                      size="primary"
                      style={{ color: "var(--text-color-light)" }}
                    >
                      Chính sách
                    </Typo>
                  </Link>
                </li>
                <li className={styles.item}>
                  <Link href={"#"}>
                    <Typo
                      size="primary"
                      style={{ color: "var(--text-color-light)" }}
                    >
                      Liên hệ
                    </Typo>
                  </Link>
                </li>
              </ul>
            </div>
            <Link
              href={"/dang-ky-chuyen-gia"}
              style={{ paddingBottom: "20px" }}
            >
              <Button color={"var(--yellow-btn)"}>Trở thành chuyên gia</Button>
            </Link>
            <Input
              size="lg"
              radius={0}
              placeholder="Nhập địa chỉ email"
              classNames={{
                input: styles.input,
              }}
              rightSectionWidth={180}
              rightSection={
                <Button
                  mr={8}
                  color={"var(--yellow-btn)"}
                  rightSection={<img src={Send.src} />}
                >
                  Đăng ký nhận tin
                </Button>
              }
            />
          </div>
        </div>
      </Container>
    </div>
    <div className={styles.copyright}>
      <Container>
        <div className={styles.row}>
          <div className={styles.left}>
            <p className={styles.copyrightText}>
              &copy; Copyright <span id="date"></span>{" "}
              <a
                href="#"
                className={styles.datxe}
                style={{ color: "rgba(255, 255, 255, 0.8)" }}
              >
                {" "}
                DATXE{" "}
              </a>{" "}
              All Rights Reserved.
            </p>
          </div>
          <div className={styles.right}>
            <ul className={styles.footerApp}>
              <li>
                <Link href={"#"}>
                  <img src={ChPlay.src} />
                </Link>
              </li>
              <li>
                <Link href={"#"}>
                  <img src={AppStore.src} />
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </div>
  </footer>
);

export { MyFooter };
