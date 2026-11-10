# SpendWise – Personal Budget & Expense Tracker

## Project Description
SpendWise is a responsive personal finance dashboard that helps users record income and expenses, view their balance, and monitor spending against example category budgets. Transactions are saved in the browser using localStorage.

## Technologies Used
- HTML5
- CSS3 (Grid, Flexbox, responsive media queries)
- JavaScript (DOM, events, arrays, calculations, localStorage)
- Git and GitHub
- Netlify

## Project Files
- `index.html` – application structure
- `style.css` – layout, colors, and responsive design
- `script.js` – transaction logic, calculations, and browser storage

## GitHub Repository Information
- Repository name: `spendwise`
- Repository URL: **Add your public GitHub repository URL here**
- Visibility: Public

## Live Netlify Website URL
**Add your deployed Netlify URL here after deployment.**

Example format: `https://your-site-name.netlify.app`

## Deployment Process Summary
1. Checked that `index.html`, `style.css`, and `script.js` are in the project root.
2. Created a public GitHub repository and uploaded all project files.
3. Signed in to Netlify and selected **Add new site → Import an existing project**.
4. Connected GitHub, selected the SpendWise repository, and deployed it.
5. Set the publish directory to the project root. No build command is required for this plain HTML/CSS/JavaScript project.
6. Changed the Netlify site name to a meaningful SpendWise name.
7. Updated the project, committed and pushed the change to GitHub, then checked that Netlify automatically deployed the new version.

## Continuous Deployment Test
After deployment, make a visible change (for example, update the dashboard welcome text), save it, and run:

```bash
git add .
git commit -m "Test automatic Netlify deployment"
git push
```

Wait for the Netlify deploy to finish, then refresh the live site and confirm that the change appears. Record the actual test result before submission.

## Final Testing Checklist
- [ ] The Netlify website opens using its public URL.
- [ ] The page layout works on desktop and mobile.
- [ ] CSS styling loads correctly.
- [ ] JavaScript loads without browser-console errors.
- [ ] Add an income transaction and confirm the balance updates.
- [ ] Add an expense transaction and confirm totals and budget bars update.
- [ ] Refresh the page and confirm transactions remain saved in that browser.
- [ ] Push a visible change to GitHub and verify Netlify automatically deploys it.
- [ ] Replace the repository and live-site placeholders in this README with the real URLs.

## Challenges Encountered During Deployment
Complete this section with the real challenges you experienced. Possible examples include connecting GitHub to Netlify, selecting the correct publish directory, or choosing a site name. Do not claim a challenge you did not experience.

## Lessons Learned
- How to organize a website for deployment.
- How to publish a project through GitHub and Netlify.
- How continuous deployment keeps the live website updated after GitHub pushes.
- How to test a live website on different screen sizes.

## Notes
This is a front-end learning project. It stores data in the current browser only; it does not use a shared online database or user accounts. Example budget limits can be edited in `script.js`.
