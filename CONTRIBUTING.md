# Contributing to LearnTogether

##### The Rundown:  
We have a repository (`menrva-lms/learntogether`) that holds production code.  
Any code that enters this repository must be production ready: tested working,  
reviewed, with clean commit history and merged in by someone who isn't you.

##### The Rules:
1. No pushes to upstream/master
2. Flattened commit history (rebase and squash)
3. No merging own code
4. Code review before production merge

##### Process:
When you want to add a new feature to production:  

1) Fork menrva-lms/learntogether on your GitHub account and clone your fork  
```
git clone https://github.com/<your_username>/learntogether
```  

2) Add menrva-lms/learntogether as upstream remote repository.  This way, you can   
grab changes as they are merged into production
```
git remote add upstream https://github.com/menrva-lms/learntogether.git
```  

3) Make a branch to work on your feature
```
git checkout -b <branch_name>
```  

4) Work as you normally would in your fork.  When you are finished, update your fork's copy of master  
```
git fetch upstream
git checkout master
git merge upstream/master
```  

5) Then, **rebase** your branch's changes on top of your fork's master
```
git checkout <branch_name>
git rebase master
git checkout master
git merge --squash <branch_name>
git commit -m "Commit message for entire branch" <list_of_files | --all>
```  

At this point, it will only look like a **single commit** has been applied on top of
master: the feature you developed.  

6) When you are satisfied with your work, open a pull request on GitHub on menrva-lms/learntogethercomparing your fork's `learntogether:master` with `menrva-lms/learntogether:master`.  Tests will run in a couple of minutes (see http://github.com/menrva-lms/ci/testing/README.md for details on the testing process).  

7) If your tests fail, return to step 4.  

8) To retest your pull request, type `retest this please` in the pull request's comments  

9) **When your tests pass**, get together with another developer and have them review your code.  When they sign off on it, they will merge your code in and **both of you** will be responsible for the code.  The merge can be done in pull request's comment section next to the build status.  

10)  Crack a beer.