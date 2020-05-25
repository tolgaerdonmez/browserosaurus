import cc from 'classcat'
import React from 'react'
import { CSSTransition, SwitchTransition } from 'react-transition-group'
import { useRecoilValue } from 'recoil'
import Url from 'url'

import { UrlHistoryItem } from '../../main/stores'
import { urlItemSelector } from '../selectors'

interface Props {
  className?: string
}

const TheUrlBar: React.FC<Props> = ({ className }) => {
  const urlItem: UrlHistoryItem | undefined = useRecoilValue(urlItemSelector)

  const parsedUrl = urlItem ? Url.parse(urlItem.url) : undefined

  return (
    <div
      className={cc([
        className,
        'flex-shrink-0 flex items-center',
        'bg-grey-800',
        'border-b border-grey-900',
        'text-xs text-grey-500 tracking-wider font-medium',
        'h-10 px-4',
      ])}
    >
      {parsedUrl ? (
        <SwitchTransition mode="out-in">
          <CSSTransition key={urlItem?.id} classNames="slide" timeout={200}>
            <span className="truncate">
              {parsedUrl.protocol}
              <span>/</span>
              <span>/</span>
              <span className="font-bold text-grey-300 text-sm">
                {parsedUrl.hostname}
              </span>
              {parsedUrl.port && `:${parsedUrl.port}`}
              {parsedUrl.pathname}
              {parsedUrl.search}
              {parsedUrl.hash}
            </span>
          </CSSTransition>
        </SwitchTransition>
      ) : (
        <span className="text-xs">
          Most recently clicked link will show here
        </span>
      )}
    </div>
  )
}

export default TheUrlBar
