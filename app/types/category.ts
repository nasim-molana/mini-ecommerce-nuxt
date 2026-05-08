export type Category = {
  name: string
  slug: string
}

export type CategoryTreeItem = Category & {
  children: Category[]
}
