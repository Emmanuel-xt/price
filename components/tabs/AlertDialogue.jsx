"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { deletePriceById } from "@/lib/actions/price.actions";
import Image from "next/image";
import { usePathname } from "next/navigation";

import React from "react";

const AlertDialogue = (priceId) => {
  const pathname = usePathname();
  const price = priceId.priceId;

  const onConfirm = async (priceId) => {
    const deleter = await deletePriceById({
      id: price,
      pathname: pathname,
    });
  };
  return (
    <AlertDialog>
      <AlertDialogTrigger>
        {" "}
        <Image src="/assets/delete.svg" alt="add" width={20} height={20} />
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>
            Confirm You want to delete this Price you add
          </AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={() => onConfirm(priceId)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AlertDialogue;
