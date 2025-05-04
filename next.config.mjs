/** @type {import('next').NextConfig} */
const nextConfig = {
    webpack(config) {
        config.module.rules.push({
          test: /\.tsx$/,
          resourceQuery: /raw/,
          use: 'raw-loader',
        });
        return config;
    },
    images: {
    domains: [
        "pbs.twimg.com", 
    ]
}
};

export default nextConfig;
