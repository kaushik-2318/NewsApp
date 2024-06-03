import NewsList from "@/components/news-list"
import { getNewsForYear } from "@/lib/news";

function FilteredNewsPage({params}) {
  const newsYear = params.year;
  const news = getNewsForYear(newsYear)
  return (
    <div>
      <NewsList news={news} />
    </div>
  )
}

export default FilteredNewsPage
