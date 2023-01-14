import {  itemsSelector, postAdapter, useGetPostsByPageQuery } from '../features/main/posts/postApiSlice'
import { useGetAllCountQuery } from '../features/main/posts/postCountSlice'

const useUseGetPostsByPageQuery = (page ) => {


    const hasNext = true

    const {data , isLoading , isSuccess , isError , error } = useGetPostsByPageQuery(page)
    const {data:length} = useGetAllCountQuery()
/*     ,{
      selectFromResult: ({result , isLoading}) => {
        return {
          data: itemsSelector.selectAll(
              result ?? postAdapter.getInitialState(),
              isLoading
            ),
        };
      },
    } */

    
    if (length?.length - data?.ids?.length === 0) {
      
        return {data , isLoading , isSuccess , isError , error , hasNext:false}
    }
    
  return {data , isLoading , isSuccess , isError , error , hasNext}
}

export default useUseGetPostsByPageQuery