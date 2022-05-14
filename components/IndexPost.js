import Link from '@/components/Link'
import Tag from '@/components/Tag'
import formatDate from '@/lib/utils/formatDate'
import Image from '@/components/Image'

import React from 'react'

const Date = (props) => {
  return (
    <dl className={props.className}>
      <dt className="sr-only">Publicado el</dt>
      <dd className="text-base font-medium leading-6 text-gray-500 dark:text-gray-400 lg:float-right">
        <time dateTime={props.date}>{formatDate(props.date)}</time>
      </dd>
    </dl>
  )
}

const IndexPost = ({ slug, date, title, summary, tags }) => {
  return (
    <li key={slug} className="py-12">
      <article>
        <Date className="float-right hidden lg:block" date={date} />
        <div className="space-y-2 xl:grid xl:grid-cols-4 xl:items-baseline xl:space-y-0">
          {/* Only display if there is an image in post's corresponding folder */}
          <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
            <div className="m-auto w-4/5">
              <Image
                src="/static/images/canada/lake.jpg"
                width="100%"
                height="100%"
                layout="responsive"
                sizes="50vw"
                alt="Post banner"
              />
            </div>
          </Link>
          <Date className="block lg:hidden" date={date} />
          <div className="space-y-5 xl:col-span-3">
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-bold leading-8 tracking-tight">
                  <Link href={`/blog/${slug}`} className="text-gray-900 dark:text-gray-100">
                    {title}
                  </Link>
                </h2>
                <div className="flex flex-wrap">
                  {tags.map((tag) => (
                    <Tag key={tag} text={tag} />
                  ))}
                </div>
              </div>
              <div className="prose max-w-none text-gray-500 dark:text-gray-400">{summary}</div>
            </div>
            <div className="text-base font-medium leading-6">
              <Link
                href={`/blog/${slug}`}
                className="text-primary-500 hover:text-primary-600 dark:hover:text-primary-400"
                aria-label={`Read "${title}"`}
              >
                Ver más &rarr;
              </Link>
            </div>
          </div>
        </div>
      </article>
    </li>
  )
}

export default IndexPost
