"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid
} from "recharts";

interface CustomerGrowthData {
  month: string;
  newCustomers: number;
  returningCustomers: number;
}

interface CustomerGrowthProps {
  data: CustomerGrowthData[];
}

export function CustomerGrowth({ data }: CustomerGrowthProps) {
  return (
    <Card className="col-span-4">
      <CardHeader>
        <CardTitle>Customer Growth</CardTitle>
      </CardHeader>
      <CardContent className="pl-2">
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
            <XAxis
              dataKey="month"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip
              contentStyle={{ backgroundColor: '#fff', borderRadius: '8px', border: '1px solid #e5e7eb' }}
              cursor={{ fill: '#f3f4f6' }}
            />
            <Bar dataKey="newCustomers" name="New" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            <Bar dataKey="returningCustomers" name="Returning" fill="#10b981" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
}