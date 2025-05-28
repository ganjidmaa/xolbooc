import os
from dotenv import load_dotenv
import subprocess

load_dotenv()
application_location = '../'
env_files_location = './eye'
ssh_pass=os.getenv('SSH_PASS')
ssh_host=os.getenv('SSH_HOST')

for name in os.listdir(env_files_location):
    load_dotenv(os.path.join(env_files_location, name), override=True)
    print(f"Started building '{name}'")
    p = subprocess.Popen(['yarn','build'], cwd=application_location)
    p.wait()

    print('Build Successful')
    build_location = os.environ['BUILD_LOCATION']
    cmd = ['sshpass', '-p', ssh_pass , 'rsync', '-aP', '--delete', application_location + '/build/', ssh_host+':' + build_location]
    process = subprocess.Popen(cmd)
    process.wait()

    print(f"Successfully builded '{name}'")

print('Builded all projects')
