/**
 * Semantic Release configuration for react-loader-animate.
 *
 * Version bump rules (standard semver):
 *   BREAKING CHANGE        → major (+1.0.0)
 *   feat                   → minor (x.+1.0)
 *   fix / perf / refactor  → patch (x.x.+1)
 *
 * chore/docs/ci/style/test/build do NOT trigger a release.
 */
module.exports = {
  branches: ['main'],
  plugins: [
    ['@semantic-release/commit-analyzer', {
      preset: 'conventionalcommits',
      releaseRules: [
        { breaking: true,    release: 'major' },
        { revert: true,      release: 'patch' },
        { type: 'feat',      release: 'minor' },
        { type: 'fix',       release: 'patch' },
        { type: 'perf',      release: 'patch' },
        { type: 'refactor',  release: 'patch' },
        // chore, docs, ci, style, test, build → no release
      ],
    }],

    ['@semantic-release/release-notes-generator', {
      preset: 'conventionalcommits',
    }],

    ['@semantic-release/changelog', {
      changelogFile: 'CHANGELOG.md',
    }],

    ['@semantic-release/npm', {
      npmPublish: true,
    }],

    ['@semantic-release/git', {
      assets: ['CHANGELOG.md', 'package.json', 'package-lock.json'],
      message: 'chore(release): ${nextRelease.version} [skip ci]\n\n${nextRelease.notes}',
    }],

    '@semantic-release/github',
  ],
};
