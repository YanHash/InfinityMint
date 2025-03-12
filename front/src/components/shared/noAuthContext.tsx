import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useConnectModal } from "@rainbow-me/rainbowkit";

export function NoAuth() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-6">
      <Card className="max-w-2xl w-full shadow-lg">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-semibold">
            Connect your Wallet
          </CardTitle>
          <CardDescription className="text-lg text-gray-500 mt-2">
            Sell & Buy your favorite digital art pieces backed by blockchain
            technology for secure ownership.
          </CardDescription>
        </CardHeader>

        <CardContent className="flex justify-center py-4">
          <img
            src="/images/Ecommerce-web-page-bro.webp"
            alt="Ecommerce Illustration"
            className="w-full h-full max-h-96 object-contain"
          />
        </CardContent>

        <CardFooter className="flex gap-4 justify-center items-center mt-6">
          <Button
            onClick={() => {
              window.location.href = "/";
            }}
            variant="outline"
            className="text-sm py-2 w-32"
          >
            Browse only
          </Button>
          {CustomConnectButton()}
        </CardFooter>
      </Card>
    </div>
  );
}

export function CustomConnectButton() {
  const { openConnectModal } = useConnectModal();

  return <Button onClick={openConnectModal}>Connect Wallet</Button>;
}
