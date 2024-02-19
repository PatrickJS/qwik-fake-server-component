import {
  JSXOutput,
  component$,
  componentQrl,
  useSignal,
  useTask$,
} from "@builder.io/qwik";
// fake asf server component don't actually use this

export const cache = new Map<string, string>();

// let count = 0;
export function serverComponentQrl(qrl: (props?: any) => Promise<JSXOutput>) {
  // @ts-ignore
  return (...args) => {
    // console.log("serverComponentQrl", ++count, args, qrl);
    // @ts-ignore
    return componentQrl(qrl)(...args);
  };
  // const res = componentQrl(qrl);
  // return res;
}

export const serverComponent$ = serverComponentQrl;
// export const serverComponent$ = function (
//   fn: (props?: any) => Promise<JSXOutput>
// ) {
//   console.log("serverComponent$");
//   return component$((props: any) => {
//     const cmp = useSignal<JSXOutput>();
//     useTask$(async () => {
//       cmp.value = await fn(props);
//     });
//     return <>{cmp.value}</>;
//   });
// };
