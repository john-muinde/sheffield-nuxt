const { DefinePlugin } = require("webpack");
module.exports = {
    // other configs
    chainWebpack: (config) => {
        config.plugins.delete("prefetch");
        config.plugin("add_flag").use(DefinePlugin, [
            {
                __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: "false",
            },
        ]);
        // other chainWebpack changes
    },
};
