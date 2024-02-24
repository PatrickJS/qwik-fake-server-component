import { Slot, component$ } from "@builder.io/qwik";
import { QwikCityProvider } from "@builder.io/qwik-city";

export default component$(() => {
  return (
    <QwikCityProvider>
      <Slot />
    </QwikCityProvider>
  );
});
