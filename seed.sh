
now=$(date)
echo Start time is: $now
npm run seed 0 --wait
npm run seed 500000 --wait
npm run seed 1000000  --wait
npm run seed 1500000  --wait
npm run seed 2000000 --wait
npm run seed 2500000 --wait
npm run seed 3000000 --wait
npm run seed 3500000 --wait
npm run seed 4000000 --wait
npm run seed 4500000 --wait
npm run seed 5000000 --wait
npm run seed 5500000 --wait
npm run seed 6000000 --wait
npm run seed 6500000 --wait
npm run seed 7000000 --wait
npm run seed 7500000 --wait
npm run seed 8000000 --wait
npm run seed 8500000 --wait
npm run seed 9500000 --wait


now=$(date)
echo Done inserting records. Stop time is: $now
