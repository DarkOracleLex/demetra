const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetWebpackPlugin = require("optimize-css-assets-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

const optimization = () => {
  const config = {
    splitChunks: {
      chunks: "all"
    }
  };

  if (isProd) {
    config.minimizer = [
      new OptimizeCssAssetWebpackPlugin(),
      new TerserWebpackPlugin()
    ];
  }

  return config;
};

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: "./index.js",
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "docs")
  },
  optimization: optimization(),
  devServer: {
    port: 4200,
    hot: isDev
  },
  plugins: [
    new HTMLWebpackPlugin({
      filename: "index.html",
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      filename: "about-us.html",
      template: "./about-us.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      filename: "contacts.html",
      template: "./contacts.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      filename: "price-list.html",
      template: "./price-list.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new HTMLWebpackPlugin({
      filename: "services.html",
      template: "./services.html",
      minify: {
        collapseWhitespace: isProd
      }
    }),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, "src/img/"),
        to: path.resolve(__dirname, "docs/img/")
      }
    ]),
    new MiniCssExtractPlugin({
      filename: "[name].css"
    })
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          "css-loader"
        ]
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: isDev,
              reloadAll: true
            }
          },
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.(png|jpg|gif|woff(2)?|ttf|eot|svg)$/,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[path][name].[ext]"
            }
          }
        ]
      },
      {
        // postcss
        test: /\.scss$/,
        use: [
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              config: { path: `./postcss.config.js` }
            }
          }
        ]
      }
    ]
  }
};
