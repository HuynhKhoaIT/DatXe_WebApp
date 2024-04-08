import { Children } from "react";
import Container from "../../common/Container";
import classNames from "classnames";
import styles from "./index.module.scss";
function Body({ children, className }: any) {
  let Content = null,
    Top = null,
    Sider = null;
  Children.forEach(children, (child) => {
    if (child.type === Body.Content) Content = child;
    if (child.type === Body.Top) Top = child;
    if (child.type === Body.Sider) Sider = child;
  });

  return (
    <Container className={classNames(styles.body, className)}>
      <main>
        {Top}
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-3">{Sider}</div>
          <div className="col-span-9">{Content}</div>
        </div>
      </main>
    </Container>
  );
}

function Top({ children }: any) {
  return children;
}

function Content({ children }: any) {
  return children;
}
function Sider({ children }: any) {
  return children;
}

Body.Content = Content;
Body.Top = Top;
Body.Sider = Sider;

export default Body;
