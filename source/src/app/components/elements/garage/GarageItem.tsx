"use client";
import Link from "next/link";
import { IGarage } from "@/interfaces/garage";
import { Button, Card, Group, Image } from "@mantine/core";
import Typo from "../Typo";
import styles from "./GarageItem.module.scss";
import { AppConstants } from "@/constants";
import ImageField from "../../form/ImageField";
const GarageItem = ({ garage }: { garage: IGarage }) => {
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Card.Section p={20}>
        <ImageField
          src={garage.logo && `${AppConstants.contentRootUrl}${garage.logo}`}
          height={160}
        />
      </Card.Section>
      <Typo size="primary" type="bold" className={styles.garageName}>
        {garage.name}
      </Typo>
      <Link href={`/chuyen-gia/${garage.id}`}>
        <Button color="blue" fullWidth mt="md">
          Xem chi tiết
        </Button>
      </Link>
    </Card>
  );
};
export { GarageItem };
