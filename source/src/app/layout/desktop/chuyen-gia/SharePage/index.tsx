"use client";
import OverviewPanel from "@/app/components/layout/OverviewPanel";
import styles from "./index.module.scss";
import SlickCarousel from "@/app/components/common/SlickCarousell";
import SocialItem from "./SocialItem";
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
const SharePage = ({ bitlyUrl }: any) => {
  return (
    <div className={styles.wrapper}>
      <OverviewPanel
        // stylesProps={{ padding: "30px 0" }}
        title="Chia sẻ"
        // linkToList={"/dich-vu"}
        hiddenShowMore={true}
        id="blogs-expert"
      >
        <div className={styles.rowItem}>
          <FacebookShareButton url={bitlyUrl}>
            <div className={styles.socialItem}>
              <FacebookIcon size={70} />
              <div className={styles.name}>Chia sẻ trên facebook</div>
            </div>
          </FacebookShareButton>
          <FacebookMessengerShareButton url={bitlyUrl} appId="521270401588372">
            <div className={styles.socialItem}>
              <FacebookMessengerIcon size={70} />
              <div className={styles.name}>Chia sẻ trên messenger</div>
            </div>
          </FacebookMessengerShareButton>
          <TwitterShareButton url={bitlyUrl}>
            <div className={styles.socialItem}>
              <XIcon size={70} />
              <div className={styles.name}>Chia sẻ trên twiter</div>
            </div>
          </TwitterShareButton>
        </div>
      </OverviewPanel>{" "}
    </div>
  );
};

export default SharePage;
