"use client";

import { Button, Text, View } from 'tamagui';

export default function Home() {
  return (
    <View>
      <Text>Hello Tamagui!</Text>
      <Button onPress={() => alert('Tamagui is working!')}>Click Me</Button>
    </View>
  );
}
