import React from "react"

export type LayoutProps = {
  children:React.ReactNode
}

export type StatCardProps={
  lg:string;
  title:string;
  children:React.ReactNode
}
export interface CoffeeRecord {
  name: string;
  cost: number;
}