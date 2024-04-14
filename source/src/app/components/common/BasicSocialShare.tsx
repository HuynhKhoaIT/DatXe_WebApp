import React from "react";
import { Button, CopyButton, Input, Modal } from "@mantine/core";
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
import SlickCarousel from "./SlickCarousell";
import Typo from "../elements/Typo";
import arrowRight from "@/assets/icons/arowrightbtn.svg";

import ImgButton from "./SlickCarousell/Button";
const BasicSocialShare = ({ opened, close }: any) => {
  const url = window.location.origin + window.location.pathname;
  const shareUrl = `${url}`;
  return (
    <Modal
      // size="calc(30vw)"
      opened={opened}
      onClose={close}
      // isOpen={opened}
      // onCloseModal={close}
      centered
      title="Chia sẽ"
      // style={{ position: 'relative', width: '50vw', height: '50vh' }}
    >
      <div style={{ padding: "0 10px" }}>
        <SlickCarousel
          gap={"10"}
          column={6}
          slidesToScroll={4}
          height={100}
          responsive={false}
          prevArrow={
            <ImgButton img={arrowRight} revert={true} width={40} height={40} />
          }
          nextArrow={<ImgButton img={arrowRight} width={40} height={40} />}
        >
          <FacebookShareButton url={shareUrl}>
            <FacebookIcon size={68} round />
            <Typo size="tiny">Facebook</Typo>
          </FacebookShareButton>
          <FacebookMessengerShareButton url={shareUrl} appId="521270401588372">
            <FacebookMessengerIcon size={68} round />
            <Typo size="tiny">messenger</Typo>
          </FacebookMessengerShareButton>
          <TwitterShareButton
            url={shareUrl}
            title={"title"}
            className="Demo__some-network__share-button"
          >
            <XIcon size={68} round />
            <Typo size="tiny">X</Typo>
          </TwitterShareButton>
          <TelegramShareButton
            url={shareUrl}
            className="Demo__some-network__share-button"
          >
            <TelegramIcon size={68} round />
            <Typo size="tiny">Telegram</Typo>
          </TelegramShareButton>
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
