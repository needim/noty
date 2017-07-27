# noty - A jQuery Notification Plugin

![noty v2 logo](http://ned.im/noty/v2/img/projects/noty-v2-logo.png "noty v2")

***
 Need some help on **push5** branch. Trying to implement html5 notifications with service worker support.
***


## Hi

**noty** is a jQuery plugin that makes it easy to create **alert** - **success** - **error** - **warning** - **information** - **confirmation** messages as an alternative the standard alert dialog. Each notification is added to a **queue**. (**Optional**)

The notifications can be positioned at the;
**top** - **topLeft** - **topCenter** - **topRight** - **center** - **centerLeft** - **centerRight** - **bottom** - **bottomLeft** - **bottomCenter** - **bottomRight**

There are lots of other options in the API to customise the text, animation, speed, buttons and much more.

It also has various callbacks for the buttons, opening closing the notifications and queue control.

***

### Documentation

Documentation and examples are here: <http://needim.github.io/noty>

***

### Pull Requests

1. [Fork](http://help.github.com/fork-a-repo/) the project, clone your fork,
   and configure the remotes:

   ```bash
   # Clone your fork of the repo into the current directory
   git clone https://github.com/<your-username>/noty.git
   # Navigate to the newly cloned directory
   cd noty
   # Assign the original repo to a remote called "upstream"
   git remote add upstream https://github.com/needim/noty.git
   ```

2. If you cloned a while ago, get the latest changes from upstream:

   ```bash
   git checkout master
   git pull upstream master
   ```

3. Create a new topic branch (off the main project development branch)
   to contain your feature, change, or fix:

   ```bash
   git checkout -b <topic-branch-name>
   ```

4. Commit your changes in logical chunks. Please adhere to these [git commit
   message guidelines](http://tbaggery.com/2008/04/19/a-note-about-git-commit-messages.html)
   or your code is unlikely be merged into the main project. Use Git's
   [interactive rebase](https://help.github.com/articles/interactive-rebase)
   feature to tidy up your commits before making them public.

5. Locally merge (or rebase) the upstream master branch into your topic branch:

   ```bash
   git pull [--rebase] upstream master
   ```

6. Push your topic branch up to your fork:

   ```bash
   git push origin <topic-branch-name>
   ```

7. [Open a Pull Request](https://help.github.com/articles/using-pull-requests/)
    with a clear title and description against the `master` branch.

**IMPORTANT**: By submitting a patch, you agree to allow the project owners to
license your work under the the terms of the [MIT License](LICENSE.txt).
