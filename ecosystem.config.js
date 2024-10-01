module.exports = {
    apps: [
      {
        name: 'lk-frontend',
        script: 'npm',
        args: 'start',
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };