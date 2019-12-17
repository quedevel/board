package org.kakarrot.service;

import lombok.Setter;
import lombok.extern.log4j.Log4j;
import org.kakarrot.domain.ReplyVO;
import org.kakarrot.mapper.BoardMapper;
import org.kakarrot.mapper.ReplyMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Log4j
@Service
public class ReplyServiceImpl implements ReplyService {

    @Setter(onMethod_ = {@Autowired})
    private BoardMapper boardMapper;

    @Setter(onMethod_ = {@Autowired})
    private ReplyMapper replyMapper;

    @Transactional
    @Override
    public void writeReply(ReplyVO vo) {
        replyMapper.insertReply(vo);
        boardMapper.replyCnt(vo.getBno());
    }

    @Transactional
    @Override
    public void removeReply(ReplyVO vo) {
        //board cnt -1 추가 필요
        Integer rno = vo.getRno();
        Integer pno = vo.getPno();
        try{
            replyMapper.deleteReply(rno);
            if(replyMapper.countPno(pno)==0)  replyMapper.deleteReply(pno);
        } catch (Exception e){
            replyMapper.updateReply(new ReplyVO().builder().rno(rno).reply("delete......").replyer("").build());
        }
    }

    @Override
    public List<ReplyVO> getReplyList(Integer bno) {
        return replyMapper.replyList(bno);
    }
}
