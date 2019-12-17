package org.kakarrot.domain;

import lombok.*;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class AttachVO {

    private Integer bno, isimg;
    private String fname, uploadpath;

    public String getRealname(){
        return this.fname.substring(this.fname.indexOf("_")+1);
    }

}
