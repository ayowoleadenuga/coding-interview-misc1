/**
 * In our app we have regions of text that may or not be contiguous.
 *
 * The text is given back as rectangles with x, y, width, and height properties.
 *
 * If the x, y, width, and height are close enough, we can assume they're the same word.
 *
 * Sometimes our rectangles are word fragments NOT the whole word so we need to join the words
 * again to form entire sentences.
 *
 * The test data has examples of what these partial regions would look like.
 */
export namespace TextMergeJoin {

    export interface IPDFTextWord {
        readonly pageNum: number;
        readonly x: number;
        readonly y: number;
        readonly width: number;
        readonly height: number;
        readonly str: string;
    }

    /**
     *
     */
    export function doMergeWords(data: ReadonlyArray<IPDFTextWord>): ReadonlyArray<IPDFTextWord> {
        //sort array in ascending order based on x
        const copy = [...data]
        copy.sort((a,b) => a.x-b.x);
        const result = []
        const skips: number[] = []
        for (let i = 0; i < copy.length; i++) {
            if(skips.includes(i))
                continue
            if(i === copy.length-1){
                result.push(copy[i])
                continue
            }

            const diff = copy[i].x + copy[i].width - copy[i+1].x
            if(diff > 0) {
                result.push({
                    ...copy[i],
                    width: copy[i].width + copy[i+1].width,
                    str: copy[i].str+copy[i+1].str
                })
                skips.push(i+1)
            } else {
                result.push(copy[i])
            }
        }
        return result;
    }

}
