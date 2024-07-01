import { getSession } from "@/lib/auth";
import styles from "./index.module.scss";
export default async function TTDK({ searchParams }: any) {
  const session = await getSession();
  const src = `https://partner.sandbox.ttdk.com.vn/?apikey=001def4c-d614-4472-a226-6d272e8ed4d1&name=${session?.user?.name}&phone=${session?.user?.phone}&licensePlates=${searchParams?.licensePlates}`;
  return (
    <iframe
      id="iframe"
      src={src}
      width="100%"
      height="100%"
      allowFullScreen
      style={{ border: "none", borderRadius: 8 }}
      className={styles.ttdkContent}
    ></iframe>
  );
}
