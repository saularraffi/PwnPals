branch=$(git status | grep -i "on branch" | awk -F ' ' '{print $3}')
git status
git add .
git commit -m "commit"
git push origin "$branch"