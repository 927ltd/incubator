import { TIncubatorConfig } from "../config-type"

export default <TIncubatorConfig>{
  metadata: {
    title: {
      template: "%s - Receipt Splitter",
      default: "Receipt Splitter",
    },
  },
  navLinks: [],
  authedNavLinks: [
    {
      href: "/orders",
      label: "Orders",
    },
  ],
  appName: "Receipt Splitter",
  hasAuth: true,
}
