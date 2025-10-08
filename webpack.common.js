import { resolve } from 'path';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const entry = {
  app: resolve(__dirname, 'src/scripts/index.js'),
};
export const output = {
  filename: '[name].bundle.js',
  path: resolve(__dirname, 'dist'),
  clean: true,
};
export const module = {
  rules: [
    {
      test: /\.css$/,
      use: [
        {
          loader: 'style-loader',
        },
        {
          loader: 'css-loader',
        },
      ],
    },
  ],
};
export const plugins = [
  new CleanWebpackPlugin(),
  new HtmlWebpackPlugin({
    filename: 'index.html',
    template: resolve(__dirname, 'src/index.html'),
  }),
  new CopyWebpackPlugin({
    patterns: [
      {
        from: resolve(__dirname, 'src/public/'),
        to: resolve(__dirname, 'dist/'),
      },
    ],
  }),
];
