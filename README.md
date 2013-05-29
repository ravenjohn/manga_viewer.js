manga-viewer
============

A simple manga viewer using Manga Eden API - http://www.mangaeden.com/api/

== Coding Guidelines

1. script.js must always be validated using JSLint. http://www.jslint.com

=== Repo Guidelines

1. Our base branch is <tt>master</tt>
2. Development branch is called <tt>apprentice</tt>
3. Branch out of <tt>apprentice</tt> when doing a new module / feature
4. Branch names should be min of 2 words max of 3 delimited by <tt>-</tt>
    e.g. 
      home-ux
5. For bug fixes add prefix <tt>fix</tt> to the branch name
    e.g.
      fix-scripts-js
6. For commit messages please avoid being ambiguous
    e.g.
    Refactored function foo and bar in scripts.js
7. Avoid commiting large chucks of code. Segregate.
8. When done with branch push it to remote: <tt>git push origin branch-name</tt>
9. Create a <tt>Pull Request</tt> for that branch merging to <tt>apprentice</tt> branch. (not <tt>master</tt>)

