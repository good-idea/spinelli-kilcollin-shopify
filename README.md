Shopify theme for spinellikilcollin.com

#Development Guidelines:

###Master Branch

The *master* branch should reflect the current state of the live site.

###Development Branch

All work in progress should be done on the *development* branch, or off of child branches of *development*.

Install themekit and `theme watch` to upload changes. Given the current `config.yml`, `theme watch` will upload to the **Testament - Development** theme, which can be previewed via the Shopify admin.

####Hotfixes

Hotfixes should be completed on the *master* branch, then merged into *develop*. It's best here to *not* use `theme watch`, because if you forget to disable it before switching back to develop, all of the changed files in that branch will be pushed. Rather, manually upload any changes you've made.

Example:

 - `git checkout master`
 - [make quick fix to menu UX]
 - `git status` to see what files you have changed
 - `theme upload -e production file1 file2`
 - `git commit -m "Burger menu hotfix resolves #12"`
 - `git checkout development`
 - `git merge master`
