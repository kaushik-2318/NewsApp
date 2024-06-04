import NewsList from "@/components/news-list"
import { getAvailableNewsMonths, getAvailableNewsYears, getNewsForYear, getNewsForYearAndMonth } from "@/lib/news";
import Link from "next/link";
import { Suspense } from "react";

async function filteredNews({ years, month }) {
  let news;
  if (years && !month) {
    news = await getNewsForYear(selectYear)
  }
  else if (years && month) {
    news = await getAvailableNewsYears(years, month)
  }

  let newsContent = <p>No news found for the selected period</p>

  if (news && news.length > 0) {
    newsContent = <NewsList news={news} />
  }

  return newsContent;

}

async function FilteredNewsPage({ params }) {
  const filter = params.filter;

  const selectYear = filter?.[0];
  const selectMonth = filter?.[1];

  const availabeYears = await getAvailableNewsYears();
  let links = availabeYears

  if (selectYear && !selectMonth) {
    links = getAvailableNewsMonths(selectYear);
  }

  if (selectYear && selectMonth) {
    links = [];
  }



  if (selectYear && !availabeYears().includes(selectYear) || selectMonth && !getAvailableNewsMonths(selectMonth).includes(selectMonth)) {
    throw new Error('Invalid Filter')
  }


  return (
    <>
      <header id="archive-header">
        <nav>
          <ul>
            {links.map((link) => {
              const href = selectYear ? `/archive/${selectYear}/${link}` : `/archive/${link}`
              return (
                <li key={link}>
                  <Link href={href}>{link}
                  </Link>
                </li>
              )
            }
            )}
          </ul>
        </nav>
      </header>
      <Suspense fallback={<p>Loading... </p>}>
        <filteredNews years={selectYear} month={selectMonth} />
      </Suspense>
    </>
  )
}

export default FilteredNewsPage
