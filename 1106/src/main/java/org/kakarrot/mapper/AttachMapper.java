package org.kakarrot.mapper;

import org.kakarrot.domain.AttachVO;

public interface AttachMapper {

    boolean insertFile(AttachVO vo);

    boolean deleteFiles(Integer bno);

    AttachVO selectOne(Integer bno);
}
