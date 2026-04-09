/**
 * Semantic Release configuration for react-loader-animate.
 *
 * Every push to main triggers at least a patch bump:
 *   fix/chore/docs/ci/refactor/style/test → patch (x.x.+1)
 *   feat                                  → minor (x.+1.0)
 *   BREAKING CHANGE                       → major (+1.0.0)
 */
module.exports = {
  branches: ['main'],
  plugins: [
    // Analyse commit messages — treat every commit type as at least a patch
    ['@semantic-release/commit-analyzer', {
      preset: 'conventionalcommits',
      releaseRules: [
        { breaking: true, release: 'major' },
        { revert: true, release: 'patch' },
        { type: 'feat', release: 'minor' },
        { type: 'fix', release: 'patch' },
        { type: 'perf', release: 'patch' },
        { type: 'chore', release: 'patch' },
        { type: 'docs', release: 'patch' },
        { type: 'ci', release: 'patch' },
        { type: 'refactor', release: 'patch' },
        { type: 'style', release: 'patch' },
        { type: 'test', release: 'patch' },
        { type: 'build', release: 'patch' },
        // Catch-all: any commit without a recognised type → patch
        { release: 'patch' },
      ],
    }],

    // Generate release notes from commits
    ['@semantic-release/release-notes-generator', {
      preset: 'conventionalcommits',
    }],

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
      assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    }],

    // Create a GitHub Release with release notes
    '@semantic-release/github',
  ],
};
