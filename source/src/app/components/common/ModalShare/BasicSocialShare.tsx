import React from "react";
import { ActionIcon, Button, CopyButton, Input, Modal } from "@mantine/core";
import {
  EmailIcon,
  EmailShareButton,
  FacebookIcon,
  FacebookMessengerIcon,
  FacebookMessengerShareButton,
  FacebookShareButton,
  FacebookShareCount,
  GabIcon,
  GabShareButton,
  HatenaIcon,
  HatenaShareButton,
  HatenaShareCount,
  InstapaperIcon,
  InstapaperShareButton,
  LineIcon,
  LineShareButton,
  LinkedinIcon,
  LinkedinShareButton,
  LivejournalIcon,
  LivejournalShareButton,
  MailruIcon,
  MailruShareButton,
  OKIcon,
  OKShareButton,
  OKShareCount,
  PinterestIcon,
  PinterestShareButton,
  PinterestShareCount,
  PocketIcon,
  PocketShareButton,
  RedditIcon,
  RedditShareButton,
  RedditShareCount,
  TelegramIcon,
  TelegramShareButton,
  TumblrIcon,
  TumblrShareButton,
  TumblrShareCount,
  TwitterShareButton,
  ViberIcon,
  ViberShareButton,
  VKIcon,
  VKShareButton,
  VKShareCount,
  WeiboIcon,
  WeiboShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  WorkplaceIcon,
  WorkplaceShareButton,
  XIcon,
} from "react-share";
import SlickCarousel from "../SlickCarousell";
import Typo from "../../elements/Typo";
import styles from "./index.module.scss";
import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import { useMediaQuery } from "@mantine/hooks";
const BasicSocialShare = ({ opened, close }: any) => {
  const isMobile = useMediaQuery("(max-width: 576px)");

  const url = window.location.origin + window.location.pathname;
  const shareUrl = `${url}`;
  return (
    <Modal
      opened={opened}
      onClose={close}
      centered
      classNames={{ title: styles.titleModal }}
      size={600}
      title="Chia sẻ"
    >
      <div style={{ padding: "0 20px" }}>
        <SlickCarousel
          gap={"10"}
          column={isMobile ? 4 : 6}
          slidesToScroll={4}
          height={100}
          responsive={false}
          prevArrow={
            <div>
              <IconChevronLeft
                color="blue"
                size={40}
                style={{
                  background: "#fff",
                  boxShadow: "var(--box-shadow-primary)",
                  borderRadius: "50%",
                }}
              />
            </div>
          }
          nextArrow={
            <div>
              <IconChevronRight
                color="blue"
                size={40}
                style={{
                  background: "#fff",
                  boxShadow: "var(--box-shadow-primary)",
                  borderRadius: "50%",
                  marginLeft: "-20px",
                }}
              />
            </div>
          }
        >
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={68} round />
            <Typo size="tiny">Facebook</Typo>
          </FacebookShareButton>
          <FacebookMessengerShareButton url={shareUrl} appId="521270401588372">
            <FacebookMessengerIcon size={68} round />
            <Typo size="tiny">messenger</Typo>
          </FacebookMessengerShareButton>
          <TelegramShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <TelegramIcon size={68} round />
            <Typo size="tiny">Telegram</Typo>
          </TelegramShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={"title"}
            className="Demo__some-network__share-button"
          >
            <XIcon size={68} round />
            <Typo size="tiny">X</Typo>
          </TwitterShareButton>

          <WhatsappShareButton
            url={shareUrl}
            separator=":: "
            className="Demo__some-network__share-button"
          >
            <WhatsappIcon size={68} round />
            <Typo size="tiny">WhatsApp</Typo>
          </WhatsappShareButton>
          <LinkedinShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <LinkedinIcon size={68} round />
            <Typo size="tiny">Linkedin</Typo>
          </LinkedinShareButton>
          <VKShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <VKIcon size={68} round />
            <Typo size="tiny">VK</Typo>
          </VKShareButton>
          <OKShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <OKIcon size={68} round />
            <Typo size="tiny">Ok</Typo>
          </OKShareButton>
          <RedditShareButton
            url={shareUrl}
            windowWidth={660}
            windowHeight={460}
            className="Demo__some-network__share-button"
          >
            <RedditIcon size={68} round />
            <Typo size="tiny">Reddit</Typo>
          </RedditShareButton>
          <GabShareButton
            url={shareUrl}
            windowWidth={660}
            windowHeight={640}
            className="Demo__some-network__share-button"
          >
            <GabIcon size={68} round />
            <Typo size="tiny">Gab</Typo>
          </GabShareButton>
        </SlickCarousel>
        <Input
          placeholder="Clearable input"
          value={shareUrl}
          size="lg"
          mt={24}
          radius="md"
          rightSectionWidth={120}
          rightSectionPointerEvents="all"
          rightSection={
            <CopyButton value={shareUrl}>
              {({ copied, copy }) => (
                <Button
                  color={copied ? "teal" : "blue"}
                  onClick={copy}
                  variant="filled"
                  radius="xl"
                >
                  {copied ? "Copied url" : "Copy url"}
                </Button>
              )}
            </CopyButton>
          }
        />
      </div>
    </Modal>
  );
};

export default BasicSocialShare;
