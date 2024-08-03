import { LoadingOverlay } from "@mantine/core";

export default function Loading() {
  return <div>
    <LoadingOverlay visible zIndex={90}
      loaderProps={{ type: 'dots', size: 150 }}
      overlayProps={{ radius: "sm", backgroundOpacity: 1., bg: "light-dark(#fff, #242424)" }} />
  </div>;
}