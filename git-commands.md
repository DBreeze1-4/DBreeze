# Git Commands

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `git clone <url>`  | Clone a repository |
| `git add <files names>`  | Add files to staging |
| `git commit -m "<message>"` | Create commit for staged files  |
| `git push -u origin <branch name>` | Push changes to remote repository |
| `git pull origin <branch name>` | Download changes from remote repository into the local repository on the current branch |
| `git switch <branch name>` | Switch to a branch |
| `git switch -c <branch name>` | Create a new branch and change to it |
| `git branch`  | Show all local branches |
| `git branch -a`  | Show all branches (local and remote) |
| `git branch -d <branch name>`  | Delete a branch |
| `git reset --soft HEAD^` | Undo the last commit, keeping the changes locally, before pushing |
| `git reset --hard HEAD^`  | Undo the last commit, discarding the changes, before pushing |
| `git log`  | Show commit history |
| `git log --oneline --decorate --graph`  | Show commit history in a pretty format in the terminal |
| `git diff <hash commit 1> <hash commit 2>` | Compare the changes between two different commits |
| `git merge <branch name>`  | Merge a branch into the current branch |
| `git commit --amend -m "<fixed message>"` | Amend commit message before pushing |
| `git revert <hash commit>` | Revert changes to a specific commit, creating a new commit from the specified one. *Does not modify the original branch* |
| `git stash`  | Save changes that are not ready to commit |
| `git stash pop`  | Apply the last stash and remove it from the stash list |
| `git stash list`  | Show all stashes |
| `git stash drop`  | Remove the last stash from the stash list |
| `git checkout -b <remote branch name> origin/<remote branch name>` | Download a remote branch and create a local branch from it |
| `git fetch`  | Download changes from remote repository without merging |
| `git remote -v`  | Show remote repositories |
