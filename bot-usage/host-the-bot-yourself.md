---
description: Make the Box your own copy!
---

# Host the bot yourself

If you're really wanting to use this bot yourself, let's go over what you need and how to install it.

### Requirements

* `git` command line. Install by clicking your operating system's name in this list:
  * [Windows](https://git-scm.com/download/win)
  * [Linux](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  * [Macintosh](https://git-scm.com/download/mac)
* `node` version [8.0.0 or higher](https://nodejs.org).
* Your **Discord bot token.** Read the first section of [this page](https://anidiots.guide/getting-started/the-long-version.html) on how to snag it.
* `Python`. Install it from [here](https://www.python.org/downloads).

### Installation

1. Head on over to your terminal \(preferrably **Command Prompt**\) and clone the repository.
   * If you want to clone to a specific folder, you have two options:
     * **`cd` into your desired folder.** For example, if you wanted to clone the repository into Documents, open the terminal normally and run `cd C:/Users/<user>/Documents`.
     * Open the terminal in a specific folder by doing **Shift-Rightclick =&gt; Open &lt;Powershell/command terminal&gt; here**.
   * After doing either of those steps, clone the repository by running `git clone https://github.com/rhearmas/cardboardbot.git` through your terminal.
2. When `git` has finished, `cd` into the newly-created folder for the repository.
3. Run `npm install`. This installs all the prerequisites for the bot through **Node package manager**, which is bundled with `node`.
   * If you get any errors about python or msibuild.exe or binding, read the requirements section again and make sure you've installed **everything**.
4. Run `node setup.js` to get a configuration file added.

### Running the bot

Open your terminal and run `node index.js` inside the folder. Don't forget to `cd` into it if the folder isn't in places like your Desktop.

### Getting it to your server

Generate an OAuth link for your bot. Use [this delicious link](https://finitereality.github.io/permissions-calculator/?v=0) to get your link. It even has a calculator for permissions!

