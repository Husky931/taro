export default defineAppConfig({
  pages: [
    "pages/index/index",
    "pages/cart/index",
    "pages/orders/index",
    "pages/me/index",
    "pages/detail/index",
    "pages/checkout/index",
  ],
  window: {
    backgroundTextStyle: "light",
    navigationBarBackgroundColor: "#fff",
    navigationBarTitleText: "Shop",
    navigationBarTextStyle: "black",
  },
  tabBar: {
    color: "#999999",
    selectedColor: "#1296db",
    backgroundColor: "#ffffff",
    borderStyle: "black",
    list: [
      { pagePath: "pages/index/index", text: "Homez" },
      { pagePath: "pages/cart/index", text: "Cart" },
      { pagePath: "pages/orders/index", text: "Orders" },
      { pagePath: "pages/me/index", text: "Me" },
    ],
  },
});
