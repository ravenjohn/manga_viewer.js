manga-viewer
============

A simple manga viewer using Manga Eden API - http://www.mangaeden.com/api/

Coding Guidelines
--------------------

1. script.js must always be validated using JSLint. http://www.jslint.com
2. Use camelCase on variables and functions
3. Use 4 spaces on indentions
4. Refrain from using server side programming languages

Repo Guidelines
--------------------

1. Our base branch is <tt>master</tt>
2. Branch out of <tt>master</tt> when doing a new module / feature
3. Branch names should be min of 2 words max of 3 delimited by <tt>-</tt>
    e.g.
      home-ux
4. For bug fixes add prefix <tt>fix</tt> to the branch name
    e.g.
      fix-scripts-js
5. For commit messages please avoid being ambiguous
    e.g.
    Refactored function foo and bar in scripts.js
6. Avoid commiting large chucks of code. Segregate.
7. When done make sure your branch is updated, <tt>git checkout master</tt>
8. Pull the latest version of master <tt>git pull</tt>
9. Return to your branch <tt>git checkout branch-name</tt>
10. Merge your branch to the latest version of master <tt>git merge master</tt>, fix conflicts if there are
11. Push it to remote: <tt>git push origin branch-name</tt>
12. Create a <tt>Pull Request</tt> for that branch merging to <tt>master</tt>.
13. If you're sure that it will work, merge it to <tt>master</tt>.


Todo List
--------------------

1. UI
2. Faster search
