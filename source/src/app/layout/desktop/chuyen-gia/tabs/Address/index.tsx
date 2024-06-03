import Map from "@/app/components/common/Map";
import styles from "./index.module.scss";
const Address = () => {
  return (
    <div className={styles.wrapper}>
      {/* <Map />
       */}
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d15675.873764547163!2d106.727084!3d10.813727!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752fea21666891%3A0xeb555d67a895a242!2zVmnhu4duIEF1dG8!5e0!3m2!1svi!2sus!4v1717410300319!5m2!1svi!2sus"
        width="100%"
        height="450"
        // style="border:0;"
        // allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      ></iframe>
    </div>
  );
};
export default Address;
