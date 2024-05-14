'use client';
import { AreaChart, Card, List, ListItem } from '@tremor/react';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

const data = [
  {
    date: 'Jan 23',
    Organic: 232,
  
  },
  {
    date: 'Feb 23',
    Organic: 241,
  
  },
  {
    date: 'Mar 23',
    Organic: 291,
  
  },
  {
    date: 'Apr 23',
    Organic: 101,
  
  },
  {
    date: 'May 23',
    Organic: 318,
  
  },
  {
    date: 'Jun 23',
    Organic: 205,
  
  },
  {
    date: 'Jul 23',
    Organic: 372,
  
  },
  {
    date: 'Aug 23',
    Organic: 341,
  
  },
  {
    date: 'Sep 23',
    Organic: 387,
    Sponsored: 120,
  },
  {
    date: 'Oct 23',
    Organic: 220,
  
  },
  {
    date: 'Nov 23',
    Organic: 372,
  
  },
  {
    date: 'Dec 23',
    Organic: 321,
  
  },
];

const summary = [
  {
    name: 'Tuthy Price',
    value: 5,
  },
  {
    name: 'Falsy Price',
    value: 2,
  },
];

const valueFormatter = (number) =>
  `${Intl.NumberFormat('us').format(number).toString()}`;

const statusColor = {
  Organic: 'bg-blue-500',
  Sponsored: 'bg-violet-500',
};

export default function Example(id) {
  return (
    <>
      <Card className="sm:mx-auto sm:max-w-lg">
        <h3 className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
          Price Trend(coming soon)
        </h3>
        <AreaChart
          data={data}
          index="date"
          categories={['Organic', 'Sponsored']}
          colors={['blue', 'primary-500']}
          valueFormatter={valueFormatter}
          showLegend={false}
          showYAxis={false}
          showGradient={true}
          startEndOnly={true}
          className="mt-6 h-32"
        />
        <List className="mt-2">
          {summary.map((item) => (
            <ListItem key={item.name}>
              <div className="flex items-center space-x-2">
                <span
                  className={classNames(statusColor[item.name], 'h-0.5 w-3')}
                  aria-hidden={true}
                />
                <span>{item.name}</span>
              </div>
              <span className="font-medium text-tremor-content-strong dark:text-dark-tremor-content-strong">
                {valueFormatter(item.value)}
              </span>
            </ListItem>
          ))}
        </List>
      </Card>
    </>
  );
}