// �J�����^�}�C�N�ɃA�N�Z�X���邽�߂̃��\�b�h���擾���Ă���
navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia;

var localStream;    // �����̉f���X�g���[����ۑ����Ă����ϐ�
var connectedCall;  // �ڑ������R�[����ۑ����Ă����ϐ�

// SkyWay�̃V�O�i�����O�T�[�o�[�֐ڑ����� (API�L�[��u��������K�v����j
var peer = new Peer({ key: '71c24437-e7f2-43e3-85e0-d20a5e39698d', debug: 3 });

// �V�O�i�����O�T�[�o�ւ̐ڑ����m�������Ƃ��ɁA����open�C�x���g���Ă΂��
peer.on('open', function () {
    // ������ID��\������
    // - ������ID��peer�I�u�W�F�N�g��id�v���p�e�B�ɑ��݂���
    // - ����͂���ID���w�肷�邱�ƂŁA�ʘb���J�n���邱�Ƃ��ł���
    $('#my-id').text(peer.id);
});

// ���肩��r�f�I�ʘb���������Ă����ꍇ�A����call�C�x���g���Ă΂��
// - �n�����call�I�u�W�F�N�g�𑀍삷�邱�ƂŁA�r�f�I�f���𑗎�M�ł���
peer.on('call', function (call) {

    // �ؒf���ɗ��p���邽�߁A�R�[���I�u�W�F�N�g��ۑ����Ă���
    connectedCall = call;

    // �����ID��\������
    // - �����ID��Call�I�u�W�F�N�g��peer�v���p�e�B�ɑ��݂���
    $("#peer-id").text(call.peer);

    // �����̉f���X�g���[���𑊎�ɓn��
    // - getUserMedia�Ŏ擾�����X�g���[���I�u�W�F�N�g���w�肷��
    call.answer(localStream);

    // ����̃X�g���[�����n���ꂽ�ꍇ�A����stream�C�x���g���Ă΂��
    // - �n�����stream�I�u�W�F�N�g�͑���̉f���ɂ��ẴX�g���[���I�u�W�F�N�g
    call.on('stream', function (stream) {

        // �f���X�g���[���I�u�W�F�N�g��URL�ɕϊ�����
        // - video�v�f�ɕ\���ł���`�ɂ��邽�ߕϊ����Ă���
        var url = URL.createObjectURL(stream);

        // video�v�f��src�ɐݒ肷�邱�ƂŁA�f����\������
        $('#peer-video').prop('src', url);
    });
});

// DOM�v�f�̍\�z���I������ꍇ�ɌĂ΂��C�x���g
// - DOM�v�f�Ɍ��т��ݒ�͂��̒��ōs�Ȃ�
$(function () {

    // �J�����^�}�C�N�̃X�g���[�����擾����
    // - �擾������������A��������Function���Ă΂��B�Ăяo�����̈����͎��g�̉f���X�g���[��
    // - �擾�Ɏ��s�����ꍇ�A��O������Function���Ă΂��
    navigator.getUserMedia({ audio: true, video: true }, function (stream) {

        // ���̃X�g���[����ʘb���������Ă��ꍇ�ƁA�ʘb��������ꍇ�ɗ��p���邽�߁A�ۑ����Ă���
        localStream = stream;

        // �f���X�g���[���I�u�W�F�N�g��URL�ɕϊ�����
        // - video�v�f�ɕ\���ł���`�ɂ��邽�ߕϊ����Ă���
        var url = URL.createObjectURL(stream);

        // video�v�f��src�ɐݒ肷�邱�ƂŁA�f����\������
        $('#my-video').prop('src', url);

    }, function () { alert("Error!"); });

    // Start Call�{�^���N���b�N���̓���
    $('#call-start').click(function () {

        // �ڑ����ID���t�H�[������擾����
        var peer_id = $('#peer-id-input').val();

        // ����ƒʘb���J�n���āA�����̃X�g���[����n��
        var call = peer.call(peer_id, localStream);

        // ����̃X�g���[�����n���ꂽ�ꍇ�A����stream�C�x���g���Ă΂��
        // - �n�����stream�I�u�W�F�N�g�͑���̉f���ɂ��ẴX�g���[���I�u�W�F�N�g
        call.on('stream', function (stream) {
            // �����ID��\������
            $("#peer-id").text(call.peer);

            // �f���X�g���[���I�u�W�F�N�g��URL�ɕϊ�����
            // - video�v�f�ɕ\���ł���`�ɂ��邽�ߕϊ����Ă���
            var url = URL.createObjectURL(stream);

            // video�v�f��src�ɐݒ肷�邱�ƂŁA�f����\������
            $('#peer-video').prop('src', url);
        });
    });

    // End�@Call�{�^���N���b�N���̓���
    $('#call-end').click(function () {
        // �r�f�I�ʘb���I������
        connectedCall.close();
    });
});