var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

function makeExtract() {
	var loader = 'css?modules&importLoaders=1&localIdentName=[name]_[local]_[hash:base64:5]';
	var param = [].slice.call(arguments).join('!');
	return ExtractTextPlugin.extract('style', loader + (param[0] === '!' ? param : ('!' + param) ));
	// return ['style',loader,...[].slice.call(arguments)].join('!');
}

module.exports = {
	devtool: 'eval-source-map',
	entry: [
		'eventsource-polyfill', // necessary for hot reloading with IE
		'webpack-hot-middleware/client',
		'./src/js/index'
	],
	output: {
		path: path.join(__dirname, 'dist'),
		filename: 'js/bundle.js',
		chunkFilename: 'js/[id].bundle.js',
		publicPath: '/static/',
		pathinfo: true
	},
	plugins: [
		new webpack.HotModuleReplacementPlugin(),
		new webpack.NoErrorsPlugin(),
		new webpack.DefinePlugin({
			DEBUG: true
		}),
		new ExtractTextPlugin('css/app.css', {
			allChunks: false
		})
	],
	module: {
		loaders: [
			{
				test: /\.jsx?/,
				loaders: ['babel'],
				include: path.join(__dirname, 'src/js')
			},
			{
				test: /\.css$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'),
				include: path.join(__dirname, 'src/css')
			},
			{
                test: /\.scss$/,
                loader: makeExtract('postcss', 'sass'),
                // include: path.join(__dirname, 'app/css'),
            },
			{
				test: /\.less$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!less'),
				include: path.join(__dirname, 'src/css')
			},
			{
				test: /\.styl$/,
				loader: ExtractTextPlugin.extract('style', 'css?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!stylus'),
				include: path.join(__dirname, 'src/css')
			},
			{
				test: /\.png|jpe?g|gif$/,
				loader: "url-loader?limit=1&name=img/[hash].[ext]",
				include: path.join(__dirname, 'src/img')
			},
			{
				// 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
				test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
				loader: 'file?name=./fonts/[name].[ext]',
				include: path.join(__dirname, 'src/css/font-awesome/fonts/')
			}
		]
	},
	resolve: {
		extensions: ['', '.js', '.jsx'],
		alias: {
			js: path.join(__dirname, "src/js")
		}
	},
	postcss: function() {
		return [
			require('postcss-original-path'),
			require('postcss-assets')({
				loadPaths: ['./src/img/'],
				relative: true
			}),
			require('postcss-cssnext')({
				browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1', 'not ie <= 8', 'Android >= 4.0', 'iOS >= 7']
			}),
			require('postcss-sprites')({
				stylesheetPath: './src/css',
				spritePath: './src/img/sprite.png',
				outputDimensions: true,
				skipPrefix: true,
				filterBy: function(img) {
					return /\/sp\-/.test(img.url);
				},
				groupBy: function(img) {
					var match = img.url.match(/\/(sp\-[^\/]+)\//);
					return match ? match[1] : null;
				}
			})
		];
	}
};
