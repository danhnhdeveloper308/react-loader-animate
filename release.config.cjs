/**
 * Semantic Release configuration for react-loader-animate.
 *
 * Commit message convention (Conventional Commits):
 *   fix: ...        → patch release  (0.0.x)
 *   feat: ...       → minor release  (0.x.0)
 *   BREAKING CHANGE → major release  (x.0.0)
 *   chore/docs/ci   → no release
 */
module.exports = {
  branches: ['main'],
  plugins: [
    // Analyse commit messages to determine version bump
    '@semantic-release/commit-analyzer',

    // Generate release notes from commits
    '@semantic-release/release-notes-generator',

    // Update CHANGELOG.md
    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
    }],

    // Publish to npm
    ['@semantic-release/npm', {
      npmPublish: true,
    }],

    // Commit the updated package.json + CHANGELOG back to main
    ['@semantic-release/git', {
      assets: ['CHANGELOG.md', 'package.json'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    }],

    // Create a GitHub Release with release notes
    '@semantic-release/github',
  ],
};
