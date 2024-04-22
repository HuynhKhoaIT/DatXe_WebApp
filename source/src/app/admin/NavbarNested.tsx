"use client";
import { ScrollArea } from "@mantine/core";
import classes from "./NavbarNested.module.scss";
import { LinksGroup } from "../components/NavBarLinksGroup/NavBarLinksGroup";
import FooterAdmin from "../layout/common/desktop/Footer/footer-admin";
import { useSession } from "next-auth/react";
import menuConfigExpert from "@/constants/menuConfig/Expert";
import menuConfigAdmin from "@/constants/menuConfig/Admin";
import { ROLE_ADMIN, ROLE_EXPERT } from "@/constants";
import { useMyGarage } from "../hooks/useMyGarage";
import menuConfigExpertDelete from "@/constants/menuConfig/ExpertDelete";

export function NavbarNested({ toggle }: any) {
  const garage = useMyGarage();

  console.log(garage?.myGarage?.status);
  var { data: session, status } = useSession();
  const role = session?.user?.role;
  const menuExpert = menuConfigExpert.map((item) => (
    <LinksGroup {...item} key={item.label} toggle={toggle} />
  ));

  const menuExpertDelete = menuConfigExpertDelete.map((item) => (
    <LinksGroup {...item} key={item.label} toggle={toggle} />
  ));

  const menuAdmin = menuConfigAdmin.map((item) => (
    <LinksGroup {...item} key={item.label} toggle={toggle} />
  ));
  if (garage?.myGarage?.status === "DELETE") {
    return (
      <nav className={classes.navbar}>
        <ScrollArea className={classes.links}>
          <div className={classes.linksInner}>{menuExpertDelete}</div>
        </ScrollArea>
        <div className={classes.footer}>
          <FooterAdmin />
        </div>
      </nav>
    );
  }
  return (
    <nav className={classes.navbar}>
      <ScrollArea className={classes.links}>
        <div className={classes.linksInner}>
          {role === ROLE_ADMIN ? menuAdmin : menuExpert}
        </div>
      </ScrollArea>
      <div className={classes.footer}>
        <FooterAdmin />
      </div>
    </nav>
  );
}
