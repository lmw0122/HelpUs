package com.ssafy.helpus.controller;

import com.ssafy.helpus.dto.Member.MemberDto;
import com.ssafy.helpus.model.Member;
import com.ssafy.helpus.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@RestController
@RequestMapping("/member")
@RequiredArgsConstructor
@CrossOrigin(origins = {"*"}, maxAge = 6000)
public class MemberController {


    private final BCryptPasswordEncoder bCryptPasswordEncoder;

    private final MemberService memberService;

    @GetMapping
    public ResponseEntity<MemberDto> getOneMemberByToken(@RequestHeader HttpHeaders headers){
        int tokenMemberId = Integer.parseInt(headers.get("memberIdByToken").get(0));
        MemberDto result = memberService.getMemberById(tokenMemberId);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @PostMapping(value = "/user")
    public ResponseEntity join(@RequestBody MemberDto member){
        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));

        System.out.println(member);
        boolean success = memberService.joinUser(member);
        if(success)
            return new ResponseEntity(HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
    @PostMapping(value = "/org",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity joinOrg(@RequestPart MemberDto member, @RequestPart MultipartFile registration){
        member.setPassword(bCryptPasswordEncoder.encode(member.getPassword()));
        System.out.println(member);
        boolean result = memberService.joinOrg(member, registration);
        if(result)
            return new ResponseEntity(HttpStatus.OK);
        else
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
    }
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody MemberDto member){
        System.out.println(member.getPassword());
        MemberDto checked = memberService.checkMember(member);
        System.out.println(checked);
        if(checked != null && bCryptPasswordEncoder.matches(member.getPassword(),checked.getPassword())){
            String token = memberService.login(checked);
            return ResponseEntity.ok().header("Authorization","Bearer "+token).body(checked);
        }
        else {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }


    @PostMapping("/email-auth")
    public ResponseEntity<Map<String,String>> emailAuth(@RequestBody Map<String,String> param){
        String email = param.get("email");
        boolean isDuplicated = memberService.checkEmail(email);
        if(isDuplicated){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        String result = memberService.getEmailCode(email);
        System.out.println("email : "+email);
        if(result.equals("error")){
            Map<String,String> tmp = new HashMap<>();
            tmp.put("result","false");
            return new ResponseEntity(tmp,HttpStatus.BAD_REQUEST);
        }
        else{
            Map<String,String> tmp = new HashMap<>();
            tmp.put("code",result);
            tmp.put("result","true");
            return new ResponseEntity(tmp,HttpStatus.OK);
        }
    }

    @PostMapping("/phone-auth")
    public ResponseEntity<Map<String,String>> phoneAuth(@RequestBody Map<String,String> param){
        String phoneNumber = param.get("number");
        boolean isDuplicated = memberService.checkTel(phoneNumber);
        if(isDuplicated){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        String result = memberService.getPhoneCode(phoneNumber);
        System.out.println("phoneNumber : "+phoneNumber);
        if(result.equals("error")){
            Map<String,String> tmp = new HashMap<>();
            tmp.put("result","false");
            return new ResponseEntity(tmp,HttpStatus.BAD_REQUEST);
        }
        else{
            Map<String,String> tmp = new HashMap<>();
            tmp.put("code",result);
            tmp.put("result","true");
            return new ResponseEntity(tmp,HttpStatus.OK);
        }
    }

    @PostMapping("/email-check")
    public ResponseEntity<Boolean> emailCheck(@RequestBody Map<String,String> param){
        String email = param.get("email");
        boolean isDuplicated = memberService.checkEmail(email);
        return new ResponseEntity(!isDuplicated,HttpStatus.OK);
    }

    @PutMapping(value = "/update",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Boolean> updateMember(@RequestPart(required = false) MemberDto member, @RequestPart(required = false) MultipartFile profile,@RequestHeader HttpHeaders headers,@RequestParam(required = false) String isDefault) throws IOException {
        int tokenMemberId = Integer.parseInt(headers.get("memberId").get(0));
        System.out.println("is Default : "+isDefault);
        String newInfo = "";
        if(member != null)
            newInfo = member.getInfo();
        boolean result = memberService.updateMember(tokenMemberId,profile,newInfo,isDefault);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @PutMapping(value = "/admin/update",consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity<Boolean> updateMemberByAdmin(@RequestPart(required = false) Member member, @RequestPart(required = false) MultipartFile profile,@RequestHeader HttpHeaders headers) throws IOException {
        int memberId = Integer.parseInt(headers.get("memberIdByToken").get(0));
        Member tmp = null;
        if(member != null)
            tmp = member;
        boolean result = memberService.updateMemberByAdmin(memberId,profile,tmp);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @DeleteMapping
    public ResponseEntity<Boolean> deleteMember(@RequestHeader HttpHeaders headers){
        int id = Integer.parseInt(headers.get("memberId").get(0));
        return new ResponseEntity(memberService.deleteMember(id),HttpStatus.OK);
    }

    @GetMapping("/admin/{page_num}")
    public ResponseEntity<List<Map<String,Object>>> getAllMemberByAdmin(@RequestHeader HttpHeaders headers, @PathVariable("page_num") int pageNum) {
        String role = headers.get("role").get(0);
        if (!role.equals("ADMIN"))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

        List<Map<String, Object>> result = new ArrayList<>();

        Map<String,Object> cnt = new HashMap<>();
        int totalCount = memberService.getCount();
        cnt.put("total_page",totalCount);
        result.add(cnt);

        Map<String,Object> member = new HashMap<>();
        List<MemberDto> members = memberService.getAllMembers();
        int from = 10*(pageNum-1);
        int to = Math.min(from+10,totalCount);
        List<MemberDto> resultMembers = members.subList(from,to);
        member.put("members",resultMembers);
        result.add(member);

        return new ResponseEntity<>(result,HttpStatus.OK);
    }

    @GetMapping("/admin/waiting-list/{page_num}")
    public ResponseEntity<List<Map<String,Object>>> getWaitMemberByAdmin(@RequestHeader HttpHeaders headers, @PathVariable("page_num") int pageNum) {
        String role = headers.get("role").get(0);
        if (!role.equals("ADMIN"))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);

        List<Map<String, Object>> result = new ArrayList<>();

        Map<String,Object> cnt = new HashMap<>();
        int totalCount = memberService.getWaitCount();
        cnt.put("total_page",totalCount);
        result.add(cnt);

        Map<String,Object> member = new HashMap<>();
        List<MemberDto> members = memberService.getWaitMembers();
        int from = 10*(pageNum-1);
        int to = Math.min(from+10,totalCount);
        List<MemberDto> resultMembers = members.subList(from,to);
        member.put("members",resultMembers);
        result.add(member);

        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @GetMapping("/admin/waiting-detail/{member_id}")
    public ResponseEntity<MemberDto> getWaitMemberDetailByAdmin(@RequestHeader HttpHeaders headers, @PathVariable("member_id") int memberId) {
        String role = headers.get("role").get(0);

        MemberDto result = memberService.getMemberById(memberId);
        if(result == null)
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        else
            return new ResponseEntity(result,HttpStatus.OK);
    }
    @PutMapping("/admin/permission")
    public ResponseEntity<Boolean> updateMemberPermission(@RequestHeader HttpHeaders headers,@RequestBody Map<String,Object> param){
        String role = headers.get("role").get(0);
        if (!role.equals("ADMIN"))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        int memberId = (int) param.get("memberId");
        boolean permission = (boolean) param.get("permission");
        if(permission){
            boolean result = memberService.updateMemberPermission(memberId);
            return new ResponseEntity<>(result,HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.OK);
    }
    @GetMapping("/admin/search/{type}/{content}/{page_num}")
    public ResponseEntity<List<Map<String,Object>>> getMembersByAdmin(@PathVariable("type") String type,@PathVariable("content") String content, @PathVariable("page_num") int pageNum){
        List<Map<String, Object>> result = new ArrayList<>();
        Map<String,Object> member = new HashMap<>();
        List<MemberDto> members;
        Map<String,Object> cnt = new HashMap<>();
        int totalCount = 0;
        if(type.equals("email")){
            members = memberService.getMembersByEmail(content);
            totalCount = members.size();
        }
        else{
            members = memberService.getMembersByName(content);
            totalCount = members.size();
        }

        cnt.put("total_page",totalCount);
        result.add(cnt);

        int from = 10*(pageNum-1);
        int to = Math.min(from+10,totalCount);
        List<MemberDto> resultMembers = members.subList(from,to);
        member.put("members",resultMembers);
        result.add(member);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @PutMapping("/admin/warning")
    public ResponseEntity<Boolean> updateMemberWarning(@RequestHeader HttpHeaders headers, @RequestBody MemberDto member){
        String role = headers.get("role").get(0);
        if (!role.equals("ADMIN"))
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        int memberId = member.getMemberId();
        boolean result = memberService.updateMemberWarning(memberId);

        return new ResponseEntity<>(result,HttpStatus.OK);
    }
    @GetMapping("/{member_id}")
    public ResponseEntity<MemberDto> getOneMember(@PathVariable("member_id") int memberId){

        MemberDto result = memberService.getMemberById(memberId);
        return new ResponseEntity<>(result,HttpStatus.OK);
    }
}
