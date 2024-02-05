import { siteConfig } from '@/lib/config'
import Link from 'next/link'
import TagItemMini from './TagItemMini'
import CONFIG from '../config'
import LazyImage from '@/components/LazyImage'
import { checkContainHttp, sliceUrlFromHttp } from '@/lib/utils'

/**
 * 文章列表卡片
 * @param {*} param0
 * @returns
 */
const BlogCard = ({ index, post, showSummary, siteInfo }) => {
  const showPreview = siteConfig('FUKASAWA_POST_LIST_PREVIEW', null, CONFIG) && post.blockMap
  // fukasawa 强制显示图片
  if (siteConfig('FUKASAWA_POST_LIST_COVER_FORCE', null, CONFIG) && post && !post.pageCover) {
    post.pageCoverThumbnail = siteInfo?.pageCover
  }
  const showPageCover = siteConfig('FUKASAWA_POST_LIST_COVER', null, CONFIG) && post?.pageCoverThumbnail
  const FUKASAWA_POST_LIST_ANIMATION = siteConfig('FUKASAWA_POST_LIST_ANIMATION', null, CONFIG)

  // 动画样式  首屏卡片不用，后面翻出来的加动画
  const aosProps = FUKASAWA_POST_LIST_ANIMATION
    ? {
        'data-aos': 'fade-up',
        'data-aos-duration': '300',
        'data-aos-once': 'true',
        'data-aos-anchor-placement': 'top-bottom'
      }
    : {}

  const url = checkContainHttp(post.slug) ? sliceUrlFromHttp(post.slug) : `${siteConfig('SUB_PATH', '')}/${post.slug}`

  return (
        <div {...aosProps} style={{ maxHeight: '60rem' }}
            className="w-full lg:max-w-sm p-3 shadow mb-4 mx-2 bg-white dark:bg-hexo-black-gray hover:shadow-lg duration-200"
        >
            <div className="flex flex-col justify-between h-full">
                {/* 封面图 */}
                {showPageCover && (
                    <div className="flex-grow mb-3 w-full duration-200 cursor-pointer transform overflow-hidden">
                        {/* <Link href={url} passHref legacyBehavior> */}
                        <Link href={post?.afflink ? `${post.afflink}` : `${url}`} passHref target='_blank'>
                            <LazyImage
                                src={post?.pageCoverThumbnail}
                                alt={post?.title || siteConfig('TITLE')}
                                className="object-cover w-full h-full hover:scale-125 transform duration-500"
                            />
                        </Link>
                    </div>
                )}

                {/* 文字部分 */}
                <div className="flex flex-col w-full">
                    <Link passHref href={`${url}`} target='_blank'
                         className={`break-words cursor-pointer font-bold hover:underline text-xl ${showPreview ? 'justify-center' : 'justify-start'} leading-tight text-gray-700 dark:text-gray-100 hover:text-blue-500 dark:hover:text-blue-400`}
                    >
                        {post.title}
                    </Link>

                    {(!showPreview || showSummary) && (
                        <p className="my-2 tracking-wide line-clamp-3 text-gray-800 dark:text-gray-300 text-md font-light leading-6">
                            {post.summary}
                        </p>
                    )}

                    {/* 分类标签 */}
                    <div className="mt-auto justify-between flex">
                        {post.category && <Link
                            href={`/category/${post.category}`}
                            passHref
                            className="cursor-pointer dark:text-gray-300 font-light text-sm hover:underline hover:text-indigo-700 dark:hover:text-indigo-400 transform"
                        >
                            <i className="mr-1 far fa-folder" />
                            {post.category}
                        </Link>}
                        <div className="md:flex-nowrap flex-wrap md:justify-start inline-block">
                            <div>
                                {post.tagItems?.map((tag) => (
                                    <TagItemMini key={tag.name} tag={tag} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  )
}

export default BlogCard
